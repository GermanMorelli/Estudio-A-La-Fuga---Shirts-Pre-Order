<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let nombre = '';
  let telefono = '';
  let talla = 'M';
  let submitted = false;
  let loading = false;
  let serverError = '';

  async function enviar() {
    if (!nombre || !telefono) return alert('Por favor completa nombre y teléfono.');

    loading = true;
    serverError = '';

    // ✅ Abrimos la ventana inmediatamente (Safari la permitirá)
    const whatsappWindow = window.open('', '_blank');

    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, talla })
      });

      const json = await res.json();

      if (!res.ok) {
        serverError = json?.error || 'Error en el servidor';
        console.error('Preorder error', json);
        whatsappWindow?.close(); // cerrar si falló
      } else {
        submitted = true;

        // ✅ Construir mensaje de WhatsApp
        const mensaje = `Hola! Soy ${nombre}. Me interesa reservar una camiseta talla ${talla}.`;
        const whatsappUrl = `https://wa.me/5216443666912?text=${encodeURIComponent(mensaje)}`;

        // ✅ Redirigir la ventana ya abierta
        whatsappWindow.location.href = whatsappUrl;
      }
    } catch (err) {
      serverError = String(err);
      whatsappWindow?.close();
    } finally {
      loading = false;
    }
  }

  // Accesibilidad: enfocar el primer input al montar
  let nombreInput;
  onMount(() => nombreInput?.focus());
</script>

<main class="min-h-screen flex items-center justify-center text-white p-4 sm:p-6"
  style="background-image: linear-gradient(rgba(15,23,42,0.72), rgba(255,140,0,0.12)), url('/camiseta%201.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
  <div class="w-full max-w-lg sm:max-w-xl bg-black/40 backdrop-blur-sm border border-white/8 p-6 sm:p-8 rounded-2xl shadow-lg mx-4"
    role="region" aria-labelledby="title">

    {#if !submitted}
      <div class="flex items-center justify-center mb-3" in:fly={{ y: -12, duration: 400 }}>
        <img src="/LOGO%202%20B.png" alt="Estudio a la Fuga - Logo" class="h-10 sm:h-14 object-contain" />
      </div>

      <p class="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 justify-center" in:fly={{ y: -6, delay: 80, duration: 350 }}>
        Reserva tu camiseta oficial por $250. Completa el formulario y te contactaremos para más detalles.
      </p>

      <form on:submit|preventDefault={enviar} class="space-y-4" in:fly={{ y: 6, delay: 140, duration: 400 }}>
        <div in:fly={{ x: -8, delay: 180, duration: 350 }}>
          <label for="nombre" class="block text-sm font-semibold mb-2">Nombre completo</label>
          <input id="nombre" bind:this={nombreInput} bind:value={nombre} placeholder="Ej. Nacho Perez" required
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base" />
        </div>

        <div in:fly={{ x: -8, delay: 220, duration: 350 }}>
          <label for="telefono" class="block text-sm font-semibold text-white mb-2">Número telefónico</label>
          <input id="telefono" type="tel" bind:value={telefono} placeholder="Ej. +52 600 000 000" required
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base" />
        </div>

        <div in:fly={{ x: -8, delay: 260, duration: 350 }}>
          <label for="talla" class="block text-sm font-semibold mb-2">Talla</label>
          <select id="talla" bind:value={talla}
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/4 border border-white/10 text-white focus:outline-none text-sm sm:text-base">
            <option value="S" class="bg-neutral-900">S</option>
            <option value="M" class="bg-neutral-900">M</option>
            <option value="L" class="bg-neutral-900">L</option>
            <option value="XL" class="bg-neutral-900">XL</option>
            <option value="2XL" class="bg-neutral-900">2XL</option>
            <option value="3XL" class="bg-neutral-900">3XL</option>
          </select>
        </div>

        <button type="submit"
          class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
          in:fly={{ y: 6, delay: 300, duration: 300 }} disabled={loading}>
          {#if loading}Enviando...{:else}Enviar{/if}
        </button>

        {#if serverError}
          <p class="text-sm text-rose-300 mt-2">{serverError}</p>
        {/if}
      </form>
    {:else}
      <h1 class="text-2xl font-bold" in:fly={{ y: -8, duration: 380 }}>¡Gracias!</h1>
      <p class="mt-3 text-white/90" in:fly={{ y: 4, delay: 80 }}>
        Recibimos tu pedido de preventa. Te contactaremos pronto al <span class="font-medium">{telefono}</span>.
      </p>
    {/if}
  </div>
</main>

<style>
  @media (max-width: 640px) {
    main[style] {
      background-position: center 20%;
    }
  }
</style>
