import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import prisma from '../utils/prisma'
import { generateToken } from '../utils/jwt'
import {  ErrorResponse, SuccessResponse } from '../types/response'
import { User } from '@prisma/client'

// Register a new user
export const register = async (req: Request, res: Response) : Promise<Response | undefined> => {

  //get email, password, name from request body
  const { email, password, name } = req.body

  try {
    //check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    //if email is already in use, return error response
    if (existingUser) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'User already exists',
      }
      return res.status(400).json(errorResponse)
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    //generate token
    const token = generateToken({ id: user.id, email: user.email })
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 30 * 24 * 60 * 60 * 1000 })

    //return success response
    const successResponse: SuccessResponse<User> = {
      success: true,
      message: 'User registered successfully',
      data: user,
    }
    return res.status(201).json(successResponse)
  } catch (error) { 
    //log error
    console.error('Error registering user:', error)
    //return error response
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Internal server error',
    }
    return res.status(500).json(errorResponse)
  }
}

// Login a user
export const login = async (req: Request, res: Response) : Promise<Response | undefined> => {

  //get email, password from request body
  const { email, password } = req.body

  try {
    //find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    //if user not found, return error response
    if (!user) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Invalid credentials',
      }
      return res.status(401).json(errorResponse)
    } 

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Invalid credentials',
      }
      return res.status(401).json(errorResponse)
    }

    //generate token
    const token = generateToken({ id: user.id, email: user.email })
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 30 * 24 * 60 * 60 * 1000 })

    //return success response
    const successResponse: SuccessResponse<User> = {
      success: true,
      message: 'User logged in successfully',
      data: user,
    }
    return res.status(200).json(successResponse)
  } catch (error) {
    console.error('Error logging in:', error)
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Internal server error',
    }
    return res.status(500).json(errorResponse)
  }
}
