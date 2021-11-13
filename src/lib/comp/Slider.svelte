<script>
    import Carousel from "svelte-carousel";
    export let a = false;
    export let imgs = [
      "https://nwp-cgn.de/img/poser/sh1.png",
      "https://nwp-cgn.de/img/poser/sh2.png",
      "https://nwp-cgn.de/img/poser/sh3.png",
      "https://nwp-cgn.de/img/poser/sh4.png",
      "https://nwp-cgn.de/img/poser/sh5.png",
    ]
    let carousel;
    let duration = 4000;
    let d = 4000;
    let currentSlide = 0;
    $: duration = d;
    const changeHandler = (e) => {
      currentSlide = e.detail; // console.log(`Current page index: ${e.detail}`)
    }
    const goToPage = (id) => {
      carousel.goTo(id, { animated: true });
    }
  </script>

  <div class="hero">
    {#key duration}
      <Carousel
        autoplay={a}
        autoplayDuration={duration}
        let:showPrevPage
        let:showNextPage
        bind:this={carousel}
        on:pageChange={changeHandler}
      >
        <aside slot="prev">
          <button on:click={showPrevPage}>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.4,16.6L10.8,12L15.4,7.4L14,6L8,12L14,18L15.4,16.6Z"
              />
            </svg>
          </button>
        </aside>
        <aside slot="next">
          <button on:click={showNextPage}>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,18L16,12L10,6L8.6,7.4L13.2,12L8.6,16.6L10,18Z"
              />
            </svg>
          </button>
        </aside>
        <!-- <footer
          slot="dots"
          class="w-full flex items-center justify-between px-8 py-3 border rounded-b">
          <span class="flex items-center">
            <label for="autoplay" class="flex items-center">
              <input bind:checked={a} id="autoplay" type="checkbox" />
              <span
                class="ml-2 font-semibold {a ? 'text-gray-700' : 'text-gray-400'}"
                >Autoplay</span>
            </label>
          </span>
          <nav>
            {#each imgs as image, i}
              <div
                class="inline-block px-3 py-2 mr-1 text-xs font-light rounded-full bg-dark-500 cursor-pointer"
                class:text-white={currentSlide == i}
                on:click={() => goToPage(i)}>
                {i}
              </div>
            {/each}
          </nav>
          <span class="inline-flex items-center">
            <input
              type="range"
              bind:value={d}
              min="1000"
              max="5000"
              step="1000" />
            <span class="ml-2">{d / 1000}s</span>
          </span>
        </footer> -->
        <!-- -->
        {#each imgs as image, i}
          <div>
            <div class="capture">
              <span class="text-2xl font-semibold p-4 rounded-xl bg-dark-800 bg-opacity-70">Slide {i}</span>
            </div>
            <img src={image} alt="img {i}" />
          </div>
        {/each}
        <!-- -->
      </Carousel>
    {/key}
  </div>
  
  <style>
    .hero {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 80px);
      border: none;
    }
    .capture {
      position: absolute;
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      margin-left: 1rem;
      z-index: 10;
      color: #eeeeee;
    }
    .hero img {
      width: 100%;
      height: calc(100vh - 80px);
      /* min-height: calc(100vh - 80px); */
      object-fit: cover;
    }
    .hero button {
      @apply h-full flex flex-col justify-center items-center bg-dark-500 text-white px-1;
    }
  </style>