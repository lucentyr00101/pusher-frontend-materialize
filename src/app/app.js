export default {
    components: {
        authenticatedNavbar: () => import('@/components/authenticated-navbar'),
        notAuthenticatedToolbar: () => import('@/components/not-authenticated-navbar'),
        footerComponent: () => import('@/components/footer')
    }
}