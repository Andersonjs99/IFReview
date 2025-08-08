<script lang="ts">
  export let label: string = '';
  export let type: string = 'text';
  export let value: string = '';
  export let required: boolean = false;
  export let minlength: number | undefined = undefined;
</script>

<div class="form-group">
  <label>
    <span>{label}</span>
    <input 
      {type} 
      bind:value 
      {required} 
      minlength={minlength}
      class="form-input"
    />
  </label>
</div>

<style>
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  label {
    display: block;
    font-weight: 500;
  }
</style>