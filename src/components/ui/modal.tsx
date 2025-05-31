import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-md w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

interface ModalContentProps {
    children: ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
    return <div className="p-4">{children}</div>;
};

interface ModalHeaderProps {
    children: ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
    return (
        <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">{children}</h2>
        </div>
    );
};

interface ModalFooterProps {
    children: ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
    return <div className="p-4 border-t flex justify-end space-x-2">{children}</div>;
};