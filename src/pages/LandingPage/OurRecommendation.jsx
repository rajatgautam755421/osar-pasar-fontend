import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import SectionBreaker from "../../Common/SectionBreaker";
import { makeApiRequests } from "../../helpers/apiHelper";
import { recommendations } from "../../helpers/constants";
import { packageRecommendationAlgorithm } from "../../helpers/generalHelper";

const OurRecommendation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reconData, setReconData] = useState(recommendations);
  const { pathname } = useLocation();

  const handleSubscription = async (type) => {
    setLoading(true);
    if (!user) {
      navigate("/login");
      return;
    }
    const response = await makeApiRequests({
      endpoint: `/users/update/${user?._id}`,
      requestBody: { subscription: type },
      method: "PUT",
    });

    if (response) {
      toast.success(`Successfully Subscribed To ${type} Plan`);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, subscription: type })
      );
      window.location.reload();
    }
    setLoading(false);
  };

  useEffect(() => {
    reconData[packageRecommendationAlgorithm(user)].isRecon = true;
    setReconData([...reconData]);
  }, []);

  return (
    <>
      <SectionBreaker text="Our Recommendations" id="our-recommendations" />
      {loading && <CircularProgress />}

      <section
        class="text-gray-600 body-font overflow-hidden my-4"
        style={{ minHeight: "auto" }}
      >
        <div class="container px-5  mx-auto">
          <div class="flex flex-wrap -m-4">
            {reconData.map(({ name, isRecon, cost, features }) => {
              return (
                <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
                  <div
                    class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden"
                    style={{ border: "1px solid #D50000" }}
                  >
                    {pathname.includes("subscribe") && isRecon && (
                      <span
                        class="text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0"
                        style={{
                          backgroundColor: "#D50000",
                        }}
                      >
                        Recommended For You
                      </span>
                    )}

                    <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                      {name}
                    </h2>
                    <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                      <span>Rs. {cost}</span>
                      <span class="text-lg ml-1 font-normal text-gray-500">
                        /year
                      </span>
                    </h1>
                    {features.map((feature) => {
                      return (
                        <p class="flex items-center text-gray-600 mb-2">
                          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2.5"
                              class="w-3 h-3"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                          </span>
                          {feature}
                        </p>
                      );
                    })}

                    <button
                      class="flex items-center mt-auto text-white bg-red-500 border-0 py-2 px-4 w-full rounded"
                      onClick={() => handleSubscription("Popular")}
                    >
                      Buy
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurRecommendation;
