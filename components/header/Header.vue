<template>
    <header class="sticky top-0 z-[999]">
        <header-finnomena-new-header :custom-logout-path="customLogoutPath" :auth-status="user.isLoggedIn" />
    </header>
</template>

<script setup lang="ts">
// composables
const user = useUser()
const customLogoutPath = '/fn3/api/auth/logoutaction'
</script>

