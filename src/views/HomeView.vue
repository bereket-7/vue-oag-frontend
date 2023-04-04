<template>
  <div class="home">
  </div>

  <CardSlider/>
  <section id="questions" class="p-5">
    <div class="container">
      <h2 class="text-center mb-4">Frequently Asked Questions</h2>
      <div class="accordion accordion-flush" id="questions">
        <!-- Item 1 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-one">
              How do I purchase artwork from your gallery?
            </button>
          </h2>
          <div id="question-one" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              You can purchase artwork from our gallery by navigating to the artwork page, selecting a work of art you
              would like to purchase, and then following the on-screen instructions. If you need help, please contact us
              and one of our team members will be happy to help.
            </div>
          </div>
        </div>
        <!-- Item 2 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-two">
              Does your online art gallery offer returns?
            </button>
          </h2>
          <div id="question-two" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              Yes, we offer 30-day returns on any artwork purchased directly from our website. Should you wish to return
              an item, please contact us within 30 days of receiving your order with your reason for return and we will
              be more than happy to assist.
            </div>
          </div>
        </div>
        <!-- Item 3 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-three">
              How Do I sign up?
            </button>
          </h2>
          <div id="question-three" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              To sign up, first you will need to locate the application form or website for the service or product you
              are interested in. After that, fill out the required information and follow any instructions set forth by
              the application. Once you have completed all of the steps, submit your application to get registered and
              receive your login credentials.
            </div>
          </div>
        </div>
<!-- item 5-->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-four">
              How is the artwork shipped and what are the shipping costs?
            </button>
          </h2>
          <div id="question-four" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              Artwork is carefully packaged and shipped via a trusted carrier such as FedEx or UPS. 
              Shipping costs are calculated based on the size, weight, and destination of the artwork.
               You can find shipping costs for each artwork on its product page.
            </div>
          </div>
        </div>
   <!-- Item 6 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-five">
              Do you offer custom framing for your artwork?
            </button>
          </h2>
          <div id="question-five" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              Yes, we offer custom framing for many of our artworks.
               You can select the framing option on the artwork's product page and choose from a variety of frames and matting options.
               If you have any specific framing requests or questions, please contact our customer support team.
            </div>
          </div>
        </div>
        <!-- Item 7 -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#question-six">
              Where are you located ?
            </button>
          </h2>
          <div id="question-six" class="accordion-collapse collapse" data-bs-parent="#questions">
            <div class="accordion-body">
              We are located in Addis ababa, bole sheger house 3rd floor.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <FooterView/>
</template>

<script>
// @ is an alias to /src
import FooterView from '@/components/FooterView.vue'
import CardSlider from '@/components/CardSlider.vue'
export default {
  name: 'HomeView',
  components: {
    FooterView,
    CardSlider
  },
}
</script>



<style scoped>
   .card {
  width: 18rem;
}

@media (max-width: 576px) {
  .card {
    width: 100%;
  }
}
</style>