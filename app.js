const fs = require('fs');
const path = require('path')
const ytdl = require('ytdl-core');
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.get('/videos', async(req, res) => {
    const { link } = req.query
    if( !link ) res.send('hech narsa bo`midi')
    let fech = true 
    let response = await ytdl(link)
            .pipe(a = await fs.createWriteStream(path.join(process.cwd(), 'files', link+'.mp4')));
    setInterval(async() => {
        if(fech){
            if(response.closed == true){
                fech = false
                let obj = {
                    videoId: link,
                    url: path.join(process.cwd(), 'files', link+'.mp4')
                }
                videos.push(obj)
                res.json({download: obj.url})
                setTimeout(async() => {
                    await fs.unlinkSync(path.join(process.cwd(),'files', link+'.mp4' ))
                }, 10000);
            }
        }
    }, 500);
})
  


app.listen(PORT, () => console.log('server is running http://localhost:'+PORT))