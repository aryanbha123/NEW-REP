import { FaTree, FaSeedling, FaLeaf, FaChartLine } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="font-heading mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase">
            Why Choose Us?
          </h2>
          <p className="mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Sustainable & Smart Plantation Management
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
            We leverage technology to optimize plantation management, ensuring sustainability, efficiency, and cost-effectiveness.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <Feature
              icon={<FaTree className="text-white text-2xl" />}
              title="Eco-Friendly Practices"
              description="We adopt sustainable farming techniques to minimize environmental impact and promote biodiversity."
            />
            <Feature
              icon={<FaSeedling className="text-white text-2xl" />}
              title="Automated Irrigation"
              description="Smart irrigation systems ensure optimal water usage, reducing waste and improving crop yield."
            />
            <Feature
              icon={<FaLeaf className="text-white text-2xl" />}
              title="Real-Time Monitoring"
              description="Track soil health, weather conditions, and crop growth with advanced sensors and analytics."
            />
            <Feature
              icon={<FaChartLine className="text-white text-2xl" />}
              title="Cost-Effective Solutions"
              description="Reduce operational costs with AI-driven insights and efficient resource allocation."
            />
          </dl>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="relative">
    <dt>
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-600">
        {icon}
      </div>
      <p className="ml-16 text-lg font-bold text-gray-700">{title}</p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-gray-500">{description}</dd>
  </div>
);

export default WhyChooseUs;
