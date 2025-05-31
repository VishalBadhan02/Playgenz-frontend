


import { useEffect, useState } from "react";
import axios from "axios";

// Define return type for useAuthRequest
interface AuthRequest {
    authGet: (url: string) => Promise<any>;
    authPost: (url: string, data: any) => Promise<any>;
    authPut: (url: string, data: any) => Promise<any>;
    authDelete: (url: string, data: any) => Promise<any>;
}

const useAuthRequest = (): AuthRequest => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    axios.defaults.headers.common["Authorization"] = `bearer ${storedToken}`;
                }
            } catch (error) {
                console.error("Error fetching token:", error);
                handleResponse(error);
            }
        };
        fetchToken();
    }, [token]);

    const authGet = async (url: string): Promise<any> => {
        try {
            console.log("GET request to:", url);
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            console.error("Error in GET request:", error);
            handleResponse(error);
        }
    };

    const authPost = async (url: string, data: any): Promise<any> => {
        try {
            console.log("POST request to:", url);
            const res = await axios.post(url, data);
            return res.data;
        } catch (error) {
            console.error("Error in POST request:", error);
            const data = handleResponse(error);
            if (data) {
                return data;
            }
        }
    };

    const authPut = async (url: string, data: any): Promise<any> => {
        try {
            console.log("PUT request to:", url);
            const res = await axios.put(url, data);
            return res.data;
        } catch (error) {
            console.error("Error in PUT request:", error);
            handleResponse(error);
        }
    };

    const authDelete = async (url: string, data: any): Promise<any> => {
        try {
            const res = await axios.delete(url, { data });
            return res.data;
        } catch (error) {
            console.error("Error in DELETE request:", error);
            handleResponse(error);
        }
    };

    return { authGet, authPost, authPut, authDelete };
};

const handleResponse = (error: any) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            // Clear token and redirect to login (if needed)
            localStorage.removeItem("token");
        } else if (status === 403) {
            console.warn("Access Denied! User lacks permissions.");
            localStorage.removeItem("token");
        } else if (status === 404) {
            console.warn("Resource not found! Please check the URL.");
            return error.response?.data;
        } else if (status === 400) {
            console.warn("Bad Request! Please check the request data.");
        } else if (status === 408) {
            console.warn("Request Timeout! Please try again.");
        } else if (status === 429) {
            console.warn("Too Many Requests! Please slow down.");
        }
        else if (status === 500 || status === 502 || status === 503) {
            console.warn("Server error! Please try again later.");
        }

        throw error; // Re-throw the error after handling
    }
};

export default useAuthRequest;
