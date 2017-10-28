<template>
  <section class="color-4">
        <nav class="cl-effect-6">
            <a href="#">Umbrella</a>
            <a href="#">Ineffable</a>
            <a href="#">Lilt</a>
            <a href="#">Mellifluous</a>
            <a href="#">Serendipity</a>
        </nav>
    </section>
</template>

<script>
export default {

}
</script>

<style>
.color-4 {
	background: #0e83cd;
}
.cl-effect-6 a {
	margin: 0 10px;
	padding: 10px 20px;
}

.cl-effect-6 a::before {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background: #fff;
	content: '';
	-webkit-transition: top 0.3s;
	-moz-transition: top 0.3s;
	transition: top 0.3s;
}

.cl-effect-6 a::after {
	position: absolute;
	top: 0;
	left: 0;
	width: 2px;
	height: 2px;
	background: #fff;
	content: '';
	-webkit-transition: height 0.3s;
	-moz-transition: height 0.3s;
	transition: height 0.3s;
}

.cl-effect-6 a:hover::before {
	top: 100%;
	opacity: 1;
}

.cl-effect-6 a:hover::after {
	height: 100%;
} 
</style>
