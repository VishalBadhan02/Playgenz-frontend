
import React, { useState } from 'react';
import { ScorecardProvider } from '../contexts/ScorecardContext'
import { useParams } from 'react-router-dom';
import { ScorecardContent } from '@/components/scoreCard/ScorecardContent';



const Scorecard = () => {
    // Track active tab for better UX
    const [activeTab, setActiveTab] = useState('selector');
    const { sport, id } = useParams<{ sport: string, id: string }>();


    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Tournament Scorecard System</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <ScorecardProvider>
                    <ScorecardContent activeTab={activeTab} setActiveTab={setActiveTab} sport={sport} id={id} />
                </ScorecardProvider>
            </main>

            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500 text-center">
                        Dynamic Scorecard System for Tournament Management
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Scorecard;
