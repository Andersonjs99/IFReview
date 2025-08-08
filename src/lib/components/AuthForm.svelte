<script lang="ts">
  import FormInput from './FormInput.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let title: string = '';
  export let submitText: string = 'Submit';
  export let showNameField: boolean = false;
  export let showPasswordConfirmation: boolean = false;
  export let alternativeAction: {
    text: string;
    linkText: string;
    href: string;
  } = {
    text: '',
    linkText: '',
    href: ''
  };

  let name: string = '';
  let email: string = '';
  let password: string = '';
  let passwordConfirmation: string = '';
  let isLoading: boolean = false;

  const handleSubmit = async () => {
    isLoading = true;
    const formData = showNameField 
      ? { name, email, password } 
      : { email, password };
    
    dispatch('submit', formData);
    isLoading = false;
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="auth-form">
  <h1>{title}</h1>
  
  {#if showNameField}
    <FormInput 
      label="Nome Completo" 
      type="text" 
      bind:value={name} 
      required
    />
  {/if}
  
  <FormInput 
    label="Email" 
    type="email" 
    bind:value={email} 
    required
  />
  
  <FormInput 
    label="Senha" 
    type="password" 
    bind:value={password} 
    required
    minlength={6}
  />
  
  {#if showPasswordConfirmation}
    <FormInput 
      label="Confirme sua Senha" 
      type="password" 
      bind:value={passwordConfirmation} 
      required
      minlength={6}
    />
  {/if}
  
  <button type="submit" disabled={isLoading} class:loading={isLoading}>
    {#if isLoading}
      <span class="spinner"></span>
    {:else}
      {submitText}
    {/if}
  </button>
  
  <div class="alternative-action">
    <span>{alternativeAction.text}</span>
    <a href={alternativeAction.href}>{alternativeAction.linkText}</a>
  </div>
</form>

<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #009933;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #009933;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #007a29;
  }

  button.loading {
    background-color: #007a29;
    cursor: not-allowed;
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  .alternative-action {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .alternative-action a {
    color: #009933;
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: 500;
  }

  .alternative-action a:hover {
    text-decoration: underline;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>