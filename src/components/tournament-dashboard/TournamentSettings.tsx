import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TournamentSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tournament Settings</CardTitle>
                <CardDescription>Configure tournament options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Tournament Privacy</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start">Public</Button>
                        <Button variant="outline" className="justify-start">Private</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-sm">Email notifications</span>
                            <Button variant="outline" size="sm">Configure</Button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-sm">App notifications</span>
                            <Button variant="outline" size="sm">Configure</Button>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button variant="destructive" size="sm">Cancel Tournament</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TournamentSettings;
