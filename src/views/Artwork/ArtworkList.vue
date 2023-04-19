<template>

	<div class="container">
		<h1 class="text-center my-5">Artwork Photo List</h1>
		<div class="row row-cols-1 row-cols-md-3 g-4">
			<div class="col">
				<div class="card">
          <img class="card-img-top" :src="require('../assets/img/abstract-landscape-bold.jpg')" alt="Hot Air Balloons">
					<div class="card-body">
						<h5 class="card-title">Artwork 1</h5>
						<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#quickViewModal1">Quick View</a>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<img src="https://via.placeholder.com/350x200" class="card-img-top" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#quickViewModal2">Quick View</a>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<img src="https://via.placeholder.com/350x200" class="card-img-top" alt="...">
					<div class="card-body">
            <h5 class="card-title">Artwork name</h5>
            <p class="card-text">Artwork Category</p>
            <p class="card-text">price</p>
						<a href="#" class="btn btn-primary quick-view" data-bs-toggle="modal" data-bs-target="#quickViewModal3">Quick View</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Quick View Modals -->
	<div class="modal fade" id="quick-view"></div>

</template>

<style>
		.card-img-top {
			transition: transform 0.5s ease;
		}

		.card:hover .card-img-top {
			transform: scale(1.2);
		}

		.quick-view {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 20px;
			background-color: rgba(11, 61, 168, 0.8);
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			display: none;
		}

		.card:hover .quick-view {
			display: block;
		}
	</style>


<script>
export default {
    name:'ArtworkList',
    setup() {
        
    },
}
</script>