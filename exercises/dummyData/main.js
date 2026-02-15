import express from "express";
import mongoose from "mongoose";
import { Employee } from "./models/Employee.js";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
await mongoose.connect("mongodb://127.0.0.1:27017/company")

app.get("/", (req, res) => {
    res.render("index", {foo : 'FOO'});
});
app.get("/generate", async (req, res) => {
    await Employee.deleteMany({})
    const names = ["Arjun", "Emily", "Carlos", "Fatima", "Liam", "Zara", "Noah"];
    const cities = ["Tokyo", "Mumbai", "Paris", "Sydney", "Dubai", "Toronto", "Seoul"];
    const languages = ["Python", "JavaScript", "C#", "Rust", "Go", "TypeScript", "Kotlin"];
    let data = [];
    for (let i = 0; i < 6; i++) {
        const salaries = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
        const isManagers = Math.random() < 0.5;
        let e =  data.push({
            name: names[i],
            city: cities[i],
            language: languages[i],
            salary: salaries,
            isManager: isManagers
        })
    }
    await Employee.insertMany(data);
    res.render("index", {foo : 'FOO'});
});

app.listen(port, () => {

});
