<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let nombre = '';
  let telefono = '';
  let talla = 'M';
  let submitted = false;

  function enviar() {
    // Simple local submit handler — you can replace this with an API call later
    if (!nombre || !telefono) return alert('Por favor complete nombre y teléfono.');
    submitted = true;
    // Here you'd normally send the data to a server
    console.log({ nombre, telefono, talla });
  }

  // small accessibility: focus first input on mount
  let nombreInput;
  onMount(() => nombreInput?.focus());
</script>

<!-- Using Tailwind for styling; ensure your Tailwind build is configured (app.css includes directives) -->

<main class="min-h-screen flex items-center justify-center text-white p-4 sm:p-6" style="background-image: linear-gradient(rgba(15,23,42,0.72), rgba(255,140,0,0.12)), url('/LOGO%20FINAL%20BN.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
  <div class="w-full max-w-lg sm:max-w-xl bg-black/40 backdrop-blur-sm border border-white/8 p-6 sm:p-8 rounded-2xl shadow-lg mx-4" role="region" aria-labelledby="title">
    {#if !submitted}
  <div class="flex items-center justify-center mb-3" in:fly={{ y: -12, duration: 400 }}>
    <img src="/LOGO%202%20B.png" alt="Estudio a la Fuga - Logo" class="h-10 sm:h-14 object-contain" />
  </div>
  <p class="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6" in:fly={{ y: -6, delay: 80, duration: 350 }}>Reserva tu camiseta oficial. Completa el formulario y te contactaremos.</p>

  <form on:submit|preventDefault={enviar} class="space-y-4" in:fly={{ y: 6, delay: 140, duration: 400 }}>
        <div in:fly={{ x: -8, delay: 180, duration: 350 }}>
          <label for="nombre" class="block text-sm font-semibold mb-2">Nombre completo</label>
          <input id="nombre" bind:this={nombreInput} bind:value={nombre} placeholder="Ej. Nacho Perez" required class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base" />
        </div>

        <div in:fly={{ x: -8, delay: 220, duration: 350 }}>
          <label for="telefono" class="block text-sm font-semibold mb-2">Número telefónico</label>
          <input id="telefono" type="tel" bind:value={telefono} placeholder="Ej. +52 600 000 000" required class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base" />
        </div>

        <div in:fly={{ x: -8, delay: 260, duration: 350 }}>
          <label for="talla" class="block text-sm font-semibold mb-2">Talla</label>
          <select id="talla" bind:value={talla} class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white focus:outline-none text-sm sm:text-base">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
          </select>
        </div>

  <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-all" in:fly={{ y: 6, delay: 300, duration: 300 }}>Enviar</button>
      </form>
    {:else}
  <h1 class="text-2xl font-bold" in:fly={{ y: -8, duration: 380 }}>¡Gracias!</h1>
  <p class="mt-3 text-white/90" in:fly={{ y: 4, delay: 80 }}>Recibimos tu pedido de preventa. Te contactaremos pronto al <span class="font-medium">{telefono}</span>.</p>
    {/if}
  </div>
</main>


<style>
  /* Move background slightly on small screens to reveal logo center differently */
  @media (max-width: 640px) {
    main[style] {
      background-position: center 20%;
    }
  }
</style>

