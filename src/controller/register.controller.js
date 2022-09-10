import express from "express";
import { db } from "../database/db.js";

async function getUserRegisters(req,res) {



    console.log('Foi aqui')
    res.sendStatus(200);
}

async function createRegister(req,res) {

}

export { getUserRegisters, createRegister };