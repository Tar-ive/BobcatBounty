import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { Location } from "../../db/schema";

interface LocationMapProps {
  location?: Location;
}

export default function LocationMap({ location }: LocationMapProps) {
  if (!location) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{location.name}</span>
          <Badge variant={location.isOpen ? "success" : "destructive"}>
            {location.isOpen ? "Open Now" : "Closed"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Address:</h4>
            <p>{location.address}</p>
            <a 
              href="https://maps.app.goo.gl/9uFmZso1Kru47pgP8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2"
            >
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                View on Google Maps
              </Button>
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Distribution Information:</h4>
            <p className="text-muted-foreground">
              The pantry takes place every Monday from 4:30 – 6:30 PM in <b>Food and Consumer Science Building 187</b> during the spring and fall semesters. Please check our social media for summer distribution information! Dates/times are subject to change.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
