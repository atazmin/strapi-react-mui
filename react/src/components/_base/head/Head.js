import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Head(props) {
  const { title, description, blockSearchIndexing } = props.props;
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={props.slug} />
        <meta name="description" content={description} />
        {blockSearchIndexing && <meta name="robots" content="noindex" />}
      </Helmet>
    </HelmetProvider>
  );
}
