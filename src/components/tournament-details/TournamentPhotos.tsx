import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Image, LayoutGrid } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from '@/components/ui/aspect-ratio';



export const TournamentPhotos = ({ tournamentData }) => {
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
    return (
        <>
            <div className="mt-4 md:mt-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Tournament Photos</CardTitle>
                            <CardDescription>
                                Photos uploaded by the tournament admin
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={viewMode === 'carousel' ? 'bg-accent' : ''}
                                onClick={() => setViewMode('carousel')}
                            >
                                <Image className="h-4 w-4 mr-2" />
                                Carousel
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={viewMode === 'grid' ? 'bg-accent' : ''}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="h-4 w-4 mr-2" />
                                Grid
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {viewMode === 'carousel' ? (
                            <div className="py-4">
                                <Carousel className="w-full max-w-5xl mx-auto">
                                    <CarouselContent>
                                        {tournamentData.images?.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <AspectRatio ratio={16 / 9}>
                                                    <img
                                                        src={image}
                                                        alt={`Tournament photo ${index + 1}`}
                                                        className="rounded-md object-cover w-full h-full"
                                                    />
                                                </AspectRatio>
                                                <p className="text-center text-sm text-muted-foreground mt-2">
                                                    Photo {index + 1} of {tournamentData.images?.length}
                                                </p>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <div className="flex justify-center mt-4">
                                        <CarouselPrevious className="relative inset-0 translate-y-0 left-0 right-auto" />
                                        <CarouselNext className="relative inset-0 translate-y-0 right-0 left-auto" />
                                    </div>
                                </Carousel>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
                                {tournamentData.images?.map((image, index) => (
                                    <div key={index} className="overflow-hidden rounded-md">
                                        <AspectRatio ratio={4 / 3}>
                                            <img
                                                src={image}
                                                alt={`Tournament photo ${index + 1}`}
                                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                            />
                                        </AspectRatio>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}