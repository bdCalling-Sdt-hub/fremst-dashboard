
import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';

function App() {
    return (
        <> 
       
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#292C61',
                        controlOutline: "none",
                    },
                    components: {
                        Input: {
                            borderRadius: 40,
                        },
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider> 

        </>
    );
}

export default App;
