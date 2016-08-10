<?php
function scotty_scripts() {

	wp_enqueue_style( 'bootstrapcss', get_template_directory_uri() . '/vendor/bootstrap.min.css', wp_get_theme()->get( 'Version' ) );

	wp_enqueue_style( 'scotty-style', get_stylesheet_uri(), wp_get_theme()->get( 'Version' ) );


	wp_register_script( 'scotty-script', get_template_directory_uri() . '/bundle.js', array(), wp_get_theme()->get( 'Version' ), true );

	wp_enqueue_script( 'scotty-script' );
}
add_action( 'wp_enqueue_scripts', 'scotty_scripts' );

add_theme_support( 'post-thumbnails' );

register_nav_menus( array(
	'primary' => __( 'Primary Menu', 'Scotty' ),
) );

function thumbnail_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'FULL' );
	$_data['featured_image_thumbnail_url'] = $thumbnail[0];
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'thumbnail_rest_prepare_post', 10, 3 );
add_filter( 'rest_prepare_page', 'thumbnail_rest_prepare_post', 10, 3 );

// Toggle to disable canonical URLs to allow port numbers.
// Required for Webpack-dev-server proxying.
define('DISABLE_CANONICAL', 'Y', true);
remove_filter('template_redirect', 'redirect_canonical');
// Hack for Webpack dev server
if (DISABLE_CANONICAL == 'Y') {
    remove_filter('template_redirect', 'redirect_canonical');
}
