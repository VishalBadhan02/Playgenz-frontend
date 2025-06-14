


import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useErrorStore } from "@/components/store/useErrorStore";

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
            const data = handleResponse(error);
            if (data) {
                return data;
            }
        }
    };

    const authPut = async (url: string, data: any): Promise<any> => {
        try {
            let headers = {};

            if (data instanceof FormData) {
                headers['Content-Type'] = 'application/json';
            }

            const res = await axios.put(url, data, { headers });
            return res.data;
        } catch (error) {
            const data = handleResponse(error);
            if (data) {
                return data;
            }
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

export const handleResponse = (error: AxiosError): any => {
    const setError = useErrorStore.getState().setError;

    if (!axios.isAxiosError(error) || !error.response) {
        setError("Unexpected error occurred. Please try again.");
        console.warn("Unknown error or network failure.");
        return { status: false, message: "Unexpected error occurred. Please try again." };
    }

    const status = error.response.status;
    const data = error.response.data;

    const errorMessages: Record<number, string> = {
        400: "Bad Request! Please check the request data.",
        401: "Unauthorized! Redirecting to login...",
        403: "Access Denied! User lacks permissions.",
        404: "Resource not found! Please check the URL.",
        408: "Request Timeout! Please try again.",
        429: "Too Many Requests! Please slow down.",
        500: "Server error! Please try again later.",
        502: "Bad Gateway! Please try again later.",
        503: "Service Unavailable! Try again later.",
    };

    console.warn(errorMessages[status] || "Unhandled error status:", status);
    const message = data?.message || errorMessages[status] || "Something went wrong.";

    // Auto clear token for auth errors
    if ([401, 403].includes(status)) {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }

    // setError(message);

    return {
        status: false,
        code: status,
        message,
        type: data?.type as any,
        error: data,
    };
};


export default useAuthRequest;



