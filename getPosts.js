const markdown = require('markdown-parse'),
            fs = require('fs');

module.exports = function getPosts() {

  var posts = [];

  try {

    var fileNames = fs.readdirSync(__dirname + '/public/posts/');

    if (fileNames.length == 0) throw 'No posts found';

    fileNames.forEach(function(fileName) {

        var content = fs.readFileSync(__dirname + '/public/posts/' + fileName, 'utf-8');

        markdown(content, function(err, result) {

            posts.push(result);
        });
    });

    return posts;

  } catch (error) {

    console.log(error);

    return posts = [{attributes:{title: 'No posts found'}}];
  }
}