import {
  Mail,
  MapPin,
  Clock,
  Phone
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-amber-100
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2 className="text-2xl font-bold">
        Contact Information
      </h2>

      <div className="mt-8 space-y-8">
        <div className="flex gap-4">
          <Mail className="mt-1 h-5 w-5 text-amber-500" />

          <div>
            <h3 className="font-semibold">
              Email
            </h3>

            <p className="text-muted-foreground">
              connect@academyfind.com
            </p>
          </div>
        </div>

        <div className="flex gap-4">
            <Phone className="mt-1 h-5 w-5 text-amber-500" />

            <div>
                <h3 className="font-semibold">
                Phone
                </h3>

                <p className="text-muted-foreground">
                +91 90456 99938
                </p>
            </div>
        </div>

        <div className="flex gap-4">
          <MapPin className="mt-1 h-5 w-5 text-amber-500" />

          <div>
            <h3 className="font-semibold">
              Location
            </h3>

            <p className="text-muted-foreground">
              India
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Clock className="mt-1 h-5 w-5 text-amber-500" />

          <div>
            <h3 className="font-semibold">
              Response Time
            </h3>

            <p className="text-muted-foreground">
              Usually within 12 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}