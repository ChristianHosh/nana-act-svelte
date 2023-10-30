<script lang="ts">
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";

    const whatIsPage = () => {
        console.log($page);
    }
</script>

<header class="navbar bg-base-100 sticky top-0">
    <div class="flex-1">
        <h1 class="text-3xl">Nana Online</h1>
    </div>
    {#if ($page.data.isLoggedIn)}
        <div>
            <a href="/dashboard"
               class="btn btn-ghost"
               class:btn-active={$page.url.pathname === '/dashboard'}
            >
                Dashboard
            </a>
            <a href="/customers"
               class="btn btn-ghost"
               class:btn-active={$page.url.pathname === '/customers'}
            >
                Customers
            </a>
            <a href="/orders"
               class="btn btn-ghost"
               class:btn-active={$page.url.pathname === '/orders'}
            >
                Orders
            </a>
            <a href="/expenses"
               class="btn btn-ghost"
               class:btn-active={$page.url.pathname === '/expenses'}
            >
                Expenses
            </a>
            <a href="/accounting"
               class="btn btn-ghost"
               class:btn-active={$page.url.pathname === '/accounting'}
            >
                Accounting
            </a>
            <details class="dropdown">
                <summary class="m-1 btn btn-ghost">Others</summary>
                <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a href="/settings">Settings</a></li>
                </ul>
            </details>
        </div>
    {:else}
        <div>
            <a href="/login"
               class="btn btn-ghost"
            >
                Login
            </a>
        </div>
    {/if}

</header>