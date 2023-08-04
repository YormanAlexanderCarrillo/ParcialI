const express = require('express')
const app = express()


app.use(express.static('public'))

app.set('PORT', process.env.PORT || 3002)
app.set(express.v)

app.listen(app.get('PORT'), ()=>{
    console.log(`Server is running on PORT ${app.get('PORT')}`);
})

app.use('/', require('./routes/index'))