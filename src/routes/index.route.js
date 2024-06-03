const express = require('express');
const route = express.Router();
const { add_student, find_student, delete_student, update_student } = require('../controllers/student_crud.controller');
const std_lgIn = require('../controllers/student.controller');
const { signUp_save, logIn_save, forGet_password, otp_check, change_pass } = require('../controllers/teacher.controller');
const { post_image, upload, std_display, like } = require('../controllers/student_post.controller');
const authenticateToken = require('../controllers/verify_token');

route.post('/upload', upload.single('file'), std_lgIn);
route.post('/post', signUp_save);
route.post('/login', logIn_save);
route.post('/add_std', add_student);
route.post('/find_student',authenticateToken, find_student);//--------
route.post('/delete_student', delete_student);
route.post('/update_student', update_student);
route.post('/std_logIn', std_lgIn);
route.post('/forGet', forGet_password);
route.post('/otp_check', otp_check);
route.post('/change_pass', change_pass);
route.post('/post_image', upload.single('file'), post_image);
route.post('/std_display', std_display);
module.exports = route;

