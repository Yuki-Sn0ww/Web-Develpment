const express = require('express')
const app = express()
const port = 3000
// app is done

const blogpost = {
    'storyofsnow' : {title : 'i am snow', content :'snow is white in color'},
    'storyoffire': {title :'i am fire', content :'fire is red in color'}
}

app.get('/blog/:slug', (req, res)=>{
    const post = blogpost[req.params.slug]

    if (post) {
        res.send(`<h1>${post.title}</h1><p>${post.content}</p>`)
    }
    else {
        res.send(`blog not found`);

    }

})

//listen te app
app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})