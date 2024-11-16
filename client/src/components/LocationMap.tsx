import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hours:</h4>
            <ul className="space-y-1">
              {Object.entries(location.hours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="font-medium">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.latitude},${location.longitude}`}
              allowFullScreen
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
