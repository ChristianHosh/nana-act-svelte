<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/dui/action/Button.svelte";
</script>

<header
  class="navbar bg-base-100 z-50 sticky top-0 border-b border-b-base-content border-1"
>
  <div class="flex-1">
    <h1 class="text-3xl font-bold">Nana Online</h1>
  </div>
  {#if $page.data.user}
    <div class="join">
      <Button
              class="join-item"
        linkTo="/dashboard"
        color="ghost"
        icon="mdi:view-dashboard-outline"
        active={$page.url.pathname === "/dashboard"}
      >
        Dashboard
      </Button>
      <Button
              class="join-item"
              linkTo="/customers"
              color="ghost"
              icon="mdi:account-group-outline"
              active={$page.url.pathname === "/customers"}
      >
        Customers
      </Button>
      <Button
              class="join-item"
              linkTo="/orders"
              color="ghost"
              icon="mdi:checkbook-arrow-left"
              active={$page.url.pathname === "/orders"}
      >
        Orders
      </Button>
      <Button
              class="join-item"
              linkTo="/expenses"
              color="ghost"
              icon="mdi:checkbook-arrow-right"
              active={$page.url.pathname === "/expenses"}
      >
        Expenses
      </Button>
      <Button
              class="join-item"
              linkTo="/accounting"
              color="ghost"
              icon="mdi:finance"
              active={$page.url.pathname === "/accounting"}
      >
        Accounting
      </Button>
      <details class="dropdown">
        <summary class="m-1 btn btn-ghost">Others</summary>
        <ul
          class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li><a href="/settings">Settings</a></li>
        </ul>
      </details>
    </div>
  {:else}
    <div>
      <Button>
        Login
      </Button>
      <a href="/login" class="btn btn-ghost"> Login </a>
    </div>
  {/if}
</header>
