const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('연결완료');
    })
    .catch(err => {
        console.log(err);
    })

app.get('/', (req, res, next) => {
    setImmediate(() => { next(new Error('it is an error')) });
})

app.post('/', (req,res)=> {
    console.log(req.body);
    res.json(req.body);
});

//라우트 연결
app.use('/users', require('./routes/users'));
app.use('/cafes', require('./routes/cafes'));
app.use('/reviews',require('./routes/reviews') );


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message || '서버에서 에러가 났습니다.');
});

app.use(express.static(path.join(__dirname, '../uploads'))); // 이미지 파일과 같은 정적파일 제공하는 미들웨어

app.listen(port, () => {
    console.log(`${port}번에서 실행이 되었습니다.`); // 템플릿 리터럴 수정
});
