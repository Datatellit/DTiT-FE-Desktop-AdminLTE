var critical = require('critical');
//使用node critical-config.js执行
critical.generate({
    // Inline the generated critical-path CSS 
    // - true generates HTML 
    // - false generates CSS 
    inline: true,
	base: './',
	minify: true,
	src:'./index_dev.html',
	css: ['bootstrap/css/bootstrap.min.css','dist/css/AdminLTE.min.css','lib/frame/css/base.css'],
	dest:'./index.html',
	extract: true,
	timeout: 300000
});

critical.generate({
    // Inline the generated critical-path CSS 
    // - true generates HTML 
    // - false generates CSS 
    inline: true,
	base: './',
	minify: true,
	src:'./login_dev.html',
	css: ['bootstrap/css/bootstrap.min.css','dist/css/AdminLTE.min.css','lib/frame/css/base.css'],
	dest:'./login.html',
	extract: true,
	timeout: 300000
});