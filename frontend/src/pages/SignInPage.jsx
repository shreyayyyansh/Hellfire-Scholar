import { SignIn } from '@clerk/react';
import './AuthPage.css';

function SignInPage() {
    return (
        <div className="auth-page">
            <div className="auth-glow"></div>
            <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                forceRedirectUrl="/app"
                appearance={{
                    elements: {
                        rootBox: 'clerk-root',
                        card: 'clerk-card',
                    },
                }}
            />
        </div>
    );
}

export default SignInPage;
