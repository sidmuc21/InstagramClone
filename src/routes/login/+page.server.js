import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    // Login action handler
    login: async ({ request, cookies }) => {

        // Retrieve form data (email and password) from the request
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // Call the login function to get a token
        const token = await login(email, password);

        // If login is successful, store the token in cookies and redirect
        if (token) {
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7, // Set cookie expiry to 7 days
                path: '/', // Make the cookie available on the entire site
                httpOnly: true, // Restrict cookie access to HTTP requests (no client-side JS)
                sameSite: 'strict' // Enhance security by sending cookies only in same-site requests
            });
            redirect(302, '/admin'); // Redirect to the admin page after successful login
        } else {
            // If login fails, return an error message
            return {
                success: false,
                message: 'Login failed'
            };
        }
    }
};