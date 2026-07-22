import Head from 'expo-router/head';

type SeoHeadProps = {
  title: string;
  description: string;
  noIndex?: boolean;
};

export function SeoHead({ title, description, noIndex = false }: SeoHeadProps) {
  return (
    <Head>
      <title>{title} · SAFEFLOOR</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#07111D" />
      <meta property="og:title" content={`${title} · SAFEFLOOR`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
    </Head>
  );
}
