const fs = require('fs');
const path = require('path')
const ytdl = require('ytdl-core');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/videos', async(req, res) => {
    let videos = await fs.readFileSync(path.join(process.cwd(), 'database', 'videos.json'),'utf-8')
    videos = JSON.parse(videos)
    const { link } = req.query
    if( !link ) return
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
                await fs.writeFileSync(path.join(process.cwd(), 'database','videos.json'), JSON.stringify(videos, null, 4))
                res.json({download: obj.url})
                setTimeout(async() => {
                    await fs.unlinkSync(path.join(process.cwd(),'files', link+'.mp4' ))
                }, 10000);
            }
        }
    }, 500);
})
  


app.listen(PORT, () => console.log('server is running http://localhost:'+PORT))