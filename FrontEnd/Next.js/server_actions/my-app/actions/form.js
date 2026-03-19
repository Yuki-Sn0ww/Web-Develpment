'use server'
import fs from 'fs/promises'


export const submitAction = async (e) => {

    console.log(e.get("name"), e.get("address"))
    fs.writeFile("dhami.txt", "i am dhami")
}