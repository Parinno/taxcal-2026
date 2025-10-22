<template>
    <header class="sticky top-0 z-[999]">
        <header-finnomena-new-header 
            :custom-logout-path="customLogoutPath" 
            :auth-status="authStatus"
            :user-data="userData"
            :show-user-menu="showUserMenu"
        />
    </header>
</template>

<script setup lang="ts">
interface UserData {
    name?: string
    email?: string
    avatar?: string
}

interface Props {
    customLogoutPath?: string
    authStatus?: boolean
    userData?: UserData
    showUserMenu?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    customLogoutPath: '/fn3/api/auth/logoutaction',
    authStatus: true,
    userData: () => ({}),
    showUserMenu: true
})

// Reactive data for dynamic updates
const { customLogoutPath, authStatus, userData, showUserMenu } = toRefs(props)

// Error handling for web component
onMounted(() => {
    const headerElement = document.querySelector('header-finnomena-new-header')
    if (!headerElement) {
        console.warn('Header web component not found')
    }
})
</script>
