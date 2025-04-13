import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import prisma from '../utils/prisma'
import { generateToken } from '../utils/jwt'
import {  ErrorResponse, SuccessResponse } from '../types/response'
import { User } from '@prisma/client'
import { sendSuccess, sendError } from '../utils/response'
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
      return sendError(res, 'User already exists', 400)
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
    return sendError(res, 'Internal server error', 500)
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
      return sendError(res, 'Invalid credentials', 401)
    }   

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials', 401)
    }

    //generate token
    const token = generateToken({ id: user.id, email: user.email })
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 30 * 24 * 60 * 60 * 1000 })

    //return success response
    return sendSuccess(res, 'Login successful', user)
  } catch (error) {
    console.error('Error logging in:', error)
    return sendError(res, 'Internal server error', 500)
  }
}
