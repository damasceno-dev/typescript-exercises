import {Global, css} from '@emotion/core';
import {ThemeProvider} from '@emotion/react';
import React, {useState} from 'react';
import {darkTheme, lightTheme} from 'styles/themes';
import {load} from 'components/loading-container';
import {Exercise} from 'containers/exercise';
import {PageLayout} from 'containers/page-layout';
import {urlParams} from 'observables/url-params';
import {fonts} from './fonts';

const globalStylesLight = css`
    html,
    body,
    #root {
        margin: 0;
        height: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: 'Segoe UI Web (West European)', Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue,
            sans-serif;
        font-size: 16px;
    }
    ${fonts}
`;

const globalStylesDark = css`
    html,
    body,
    #root {
        margin: 0;
        height: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: 'Segoe UI Web (West European)', Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue,
            sans-serif;
        font-size: 16px;
    }
    ${fonts}
`;

export function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <Global styles={theme === 'light' ? globalStylesLight : globalStylesDark} />
            <PageLayout toggleTheme={toggleTheme}>
                {load(urlParams.observable$, (params) => (
                    <Exercise key={params.exercise} exerciseNumber={Number(params.exercise)} />
                ))}
            </PageLayout>
        </ThemeProvider>
    );
}
