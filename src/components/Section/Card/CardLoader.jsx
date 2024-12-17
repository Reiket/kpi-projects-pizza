import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="120" r="120" />
        <rect x="0" y="258" rx="10" ry="10" width="280" height="26" />
        <rect x="0" y="297" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="396" rx="10" ry="10" width="95" height="30" />
        <rect x="169" y="396" rx="10" ry="10" width="112" height="30" />
    </ContentLoader>
)

export default CardLoader






