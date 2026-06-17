import { meili } from "@/lib/meilisearch";

async function main() {
  const index = meili.index("global_search");

  console.log("Configuring global_search index...");

  const searchableTask = await index.updateSearchableAttributes([
    "name",
    "address",
    "city",
    "description",
    "categoryNames",
    "state",
  ]);

  const filterableTask = await index.updateFilterableAttributes([
    "type",
    "citySlug",
    "categorySlugs",
    "_geo",
    "googleRating",
    "isActive"
  ]);

  const sortableTask = await index.updateSortableAttributes([
    "name",
    "_geo",
    "googleRating",
    "googleReviewCount"
  ]);

  const typoTask = await index.updateTypoTolerance({
    enabled: true,
  });

  const rankingTask = await index.updateRankingRules([
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
  ]);

  await Promise.all([
    meili.tasks.waitForTask(searchableTask.taskUid,{ timeout: 60000 }),
    meili.tasks.waitForTask(filterableTask.taskUid,{ timeout: 60000 }),
    meili.tasks.waitForTask(sortableTask.taskUid,{ timeout: 60000 }),
    meili.tasks.waitForTask(typoTask.taskUid,{ timeout: 60000 }),
    meili.tasks.waitForTask(rankingTask.taskUid,{ timeout: 60000 }),
  ]);

  console.log("✅ global_search configured successfully");
}

main().catch(console.error);