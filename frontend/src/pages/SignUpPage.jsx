import { SignUp } from '@clerk/react';
import './AuthPage.css';

function SignUpPage() {
    return (
        <div className="auth-page">
            <div className="auth-glow"></div>
            <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
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

export default SignUpPage;
