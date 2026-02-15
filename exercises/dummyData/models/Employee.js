import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    name : String,
    city : String,
    language : String,
    salary : Number,
    isManager : Boolean
})

export const Employee = mongoose.model('Employee' , employeeSchema)
