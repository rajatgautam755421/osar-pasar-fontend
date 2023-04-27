import { subscriptionDiscount } from "./constants";

export const totalCostForAnOrder = (orderInfo, user) => {
  const unitPrice = 10;
  const extraPriceForDistanceGreatetThanThreshold = 2;
  const threshholdDistance = 200;

  const weightedPrice = unitPrice * Number(orderInfo?.courierSize);

  const distanceOfDelivery = 200; // Distance From Our Nearest Delivery Center

  const isItSingleDayDelivery = distanceOfDelivery <= 150;

  let distancePrice;
  if (distanceOfDelivery <= threshholdDistance) {
    distancePrice = 0;
  } else {
    distancePrice =
      Number(distanceOfDelivery - threshholdDistance) *
      extraPriceForDistanceGreatetThanThreshold;
  }

  const subscriptionDiscountAmount =
    subscriptionDiscount[user?.subscription] ?? 0;

  return {
    "Weight Of Courier": `${orderInfo?.courierSize} Kg.`,
    "Unit Price": `Rs. ${unitPrice}`,
    "Weighted Price": `${orderInfo?.courierSize} Kg. x Rs. ${unitPrice} = Rs. ${weightedPrice}`,
    "Delivery Distance From Our Nearest Delivery Center": `${distanceOfDelivery} km`,
    "Is Single Day Delivery": isItSingleDayDelivery ? "Yes" : "No",
    "Price According To Distance": `Rs.${distancePrice}`,
    "Discount On Subscription": `${subscriptionDiscountAmount}%`,
    "Total Price": `Rs. ${
      weightedPrice +
      distancePrice -
      (subscriptionDiscountAmount / 100) * (weightedPrice + distancePrice)
    }`,
    exactPrice:
      weightedPrice +
      distancePrice -
      (subscriptionDiscountAmount / 100) * (weightedPrice + distancePrice),
  };
};

export const convertLowerCaseTextToReadableFromat = (text) => {
  const splittedText = text?.split(" ");
  return splittedText.map((t) => t[0].toUpperCase() + t.slice(1)).join(" ");
};

export const getAllMunicipalNames = (
  provienceInfo,
  provienceName,
  districtName
) => {
  const totalMunicipalInfo = [];

  ["Ma.Na.Pa.", "Upa.Ma.", "Na.Pa.", "Ga.Pa."].forEach((e) => {
    totalMunicipalInfo.push(
      ...(provienceInfo?.[provienceName]?.[districtName]?.[e] || null)
    );
  });

  return totalMunicipalInfo;
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const generateOrderLineChart = (orders, startMonth, endMonth) => {
  const filteredMonths = months.filter(
    (_, idx) => idx >= startMonth && idx <= endMonth
  );

  const filteredOrdersAccordingToYear = orders.filter(
    (order) =>
      new Date(order?.createdAt)?.getFullYear() === new Date().getFullYear()
  );
  const finalChartResult = [];

  filteredMonths.forEach((month) => {
    finalChartResult.push({
      month: month,
      "Number Of Courier Orders": [
        ...filteredOrdersAccordingToYear.filter(
          (order) => months[new Date(order?.createdAt).getMonth()] === month
        ),
      ]?.length,
    });
  });

  return finalChartResult;
};

export const filterOrdersOnSearchQuery = (orders, query) => {
  const filterValues = [
    "_id",
    "deliveryProvience",
    "deliveryDistrict",
    "deliveryMunicipality",
    "status",
    "recieverEmail",
    "typeOfParcel",
  ];

  return orders.filter((order) => {
    return filterValues.some((filterValue) => {
      return order[filterValue]
        ?.toLowerCase()
        ?.trim()
        ?.includes(query?.toLowerCase()?.trim());
    });
  });
};

export const getNestedCommentsUserInterface = (comments = []) => {
  const parentCommnts = comments.filter((comment) => !comment?.isARelpyTo);

  const completeCommentObj = [];

  const getRecurssiveComments = (recurrComment) => {
    recurrComment.forEach((comment) => {
      const findChildComments = comments.filter(
        (comm) => comm?.isARelpyTo === comment?.uuid
      );

      completeCommentObj.push({
        ...comment,
        children: [...getRecurssiveComments(findChildComments)],
      });
    });
  };

  getRecurssiveComments(parentCommnts);

  return completeCommentObj;
};

export const camelToNormal = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

//Algorithms Used

export const packageRecommendationAlgorithm = (user) => {
  let generatedRecommendationIndex = null;

  let indexOfValue = Math.floor(Math.random() * 3);

  const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  };

  // function that returns the minimum cost and path to reach Finish
  const recommendation = (graph) => {
    // track lowest cost to reach each node
    const costs = Object.assign({ finish: Infinity }, graph?.start);
    generatedRecommendationIndex = indexOfValue;
    console.log(user);

    // track paths
    const parents = { finish: null };
    for (let child in graph?.start) {
      parents[child] = "start";
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
      let cost = costs?.[node];
      let children = graph?.[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
    }

    let optimalPath = ["finish"];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
      distance: costs.finish,
      path: optimalPath,
    };

    return results;
  };

  recommendation();
  return generatedRecommendationIndex;
};

export let binarySearch = function (sorted_arr, target, start, end, field) {
  if (start > end) return -1;

  let mid = Math.floor((start + end) / 2);

  if (sorted_arr[mid]?.toLowerCase().includes(target?.toLowerCase()))
    return mid;

  if (sorted_arr[mid] > target)
    return binarySearch(sorted_arr, target, start, mid - 1);
  else return binarySearch(sorted_arr, target, mid + 1, end);
};

export function searchSubList(array, searchItem) {
  let matches = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      return;
    } else {
      if (array[i]?.email?.toLowerCase().includes(searchItem?.toLowerCase())) {
        matches.push(array[i]);
      }
    }
  }

  // Return the matches array
  return matches;
}
