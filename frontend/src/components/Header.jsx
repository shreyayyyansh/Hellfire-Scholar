import { UserButton, useUser } from '@clerk/react';
import './Header.css';

function Header() {
    const { user } = useUser();

    return (
        <header className="app-header">
            <div className="header-left">
                <h2 className="header-greeting">
                    Welcome back, <span className="header-name">{user?.firstName || 'Scholar'}</span>
                </h2>
            </div>
            <div className="header-right">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: { width: 36, height: 36 },
                        },
                    }}
                />
            </div>
        </header>
    );
}

export default Header;
