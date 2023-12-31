import { createClient } from 'pexels';

import MasonryPin from '../components/mansory';

export default async function Page() {
  const client = createClient(process.env.PIXEL_API_KEY as string);

  // get popular collections
  const response = (await client.photos.search({
    query: 'car',
    per_page: 24,
    page: 1,
  })) as any;
  return (
    <div>
      <MasonryPin photos={response.photos} />
    </div>
  );
}
