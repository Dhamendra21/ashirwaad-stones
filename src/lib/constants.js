export const BRAND = {
  name: "Ashirwaad Stone",
  officialName: "Ashirwad Stone",
  tagline: "TILES | MARBLE | GRANITE",
  curationSubtitle: "Curated Architectural Surfaces & Slabs · Est. 1998",
  phones: [
    {
      number: "9479272520",
      display: "+91 94792 72520",
      tel: "tel:+919479272520",
      primary: true,
      label: "Direct Line & WhatsApp",
    },
    {
      number: "9893839456",
      display: "+91 98938 39456",
      tel: "tel:+919893839456",
      primary: false,
      label: "Showroom Inquiries",
    },
  ],
  instagram: {
    url: "https://www.instagram.com/ashirwad_stone/",
    handle: "@ashirwad_stone",
    username: "ashirwad_stone",
  },
  whatsapp: {
    primaryNumber: "919479272520",
    secondaryNumber: "919893839456",
    createUrl: (message) => {
      const encoded = encodeURIComponent(
        message ||
          "Hello Ashirwaad Stone, I would like to inquire about your marble, granite, and porcelain slab collections."
      );
      return `https://wa.me/919479272520?text=${encoded}`;
    },
  },
  email: "hello@ashirwaadstone.com",
  showroom: {
    name: "Ashirwad Stone Showroom & Yards",
    address: "Supela, Kripal Nagar, Bhilai, Chhattisgarh 490023",
    hours: "Mon – Sat: 10 AM – 8 PM",
    googleMapsUrl: "https://maps.google.com/?q=Ashirwad+Stone+Bhilai",
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6868.90039334794!2d81.34348038316227!3d21.21908379084505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2923cc74db5b15%3A0x37403718c974a71c!2sAshirwad%20Stone!5e1!3m2!1sen!2sin!4v1795080884845!5m2!1sen!2sin",
  },
};
