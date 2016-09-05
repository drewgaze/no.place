<my-blog>
	<div each={ posts }>
		<article>
			<h3>{ attributes.title }</h3>
			{ body }
		</article>
	</div>

	this.on('mount', function() {

		this.posts = opts.posts;
		this.update();
	});

</my-blog>