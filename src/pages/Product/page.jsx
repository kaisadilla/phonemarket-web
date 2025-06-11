import { Link, useParams } from 'react-router';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import useProduct from '../../hooks/useProduct';
import { Box, Button, LoadingOverlay, ScrollArea, SegmentedControl, Tabs, Text } from '@mantine/core';
import { addToCart } from '../../api/product';
import { useShopContext } from '../../context/useShopContext';

export default function ProductPage () {
  const { id } = useParams();
  const shopCtx = useShopContext();

  const { data: product, isLoading, error } = useProduct(id);

  const [storage, setStorage] = useState("0");
  const [color, setColor] = useState("0");

  if (product === undefined) {
    return <div className={styles.productPage}>
      <LoadingOverlay visible={true} zIndex={90} />
    </div>
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.imageContainer}>
        <Link className={styles.back} to="/">
          <span className="material-symbols-sharp">chevron_left</span>
          <span className={styles.label}>back</span>
        </Link>
        <img src={product.imgUrl} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h2 className={styles.model}>{product.model}</h2>
          <Tabs
            classNames={{
              root: styles.infoTable,
              panel: styles.panel,
            }}
            defaultValue="general"
          >
            <Tabs.List>
              <Tabs.Tab value="general">General</Tabs.Tab>
              <Tabs.Tab value="features">Features</Tabs.Tab>
              <Tabs.Tab value="hardware">Hardware</Tabs.Tab>
              <Tabs.Tab value="internet">Internet</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="general">
              <ScrollArea
                scrollbars='y'
              >
                <_Datum label="Brand" value={product.brand} />
                <_Datum label="Model" value={product.model} />
                <_Datum label="Dimensions" value={product.dimensions ?? product.dimentions} />
                <_Datum label="Weight" value={product.weight} />
                <_Datum label="Sim" value={product.sim} />
                <_Datum label="Release date" value={product.announced} />
                <_Datum label="Primary camera" value={product.primaryCamera} />
                <_Datum label="Secondary camera" value={product.secondaryCamera} />
                <_Datum label="GPS" value={product.gps} />
                <_Datum label="OS" value={product.os} />
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="features">
              <_Datum label="Display type" value={product.displayType} />
              <_Datum label="Display resolution" value={product.displayResolution} />
              <_Datum label="Display size" value={product.displaySize} />
              <_Datum label="Speaker" value={product.speaker} />
              <_Datum label="Audio jack" value={product.audioJack} />
              <_Datum label="NFC" value={product.nfc} />
              <_Datum label="Radio" value={product.radio} />
              <_Datum label="USB" value={product.usb} />
              <_Datum label="Sensors" value={product.sensors} />
            </Tabs.Panel>

            <Tabs.Panel value="hardware">
              <_Datum label="CPU" value={product.cpu} />
              <_Datum label="Chipset" value={product.chipset} />
              <_Datum label="GPU" value={product.gpu} />
              <_Datum label="External memory" value={product.externalMemory} />
              <_Datum label="Internal memory" value={product.internalMemory} />
              <_Datum label="RAM" value={product.ram} />
            </Tabs.Panel>

            <Tabs.Panel value="internet">
              <_Datum label="Network technology" value={product.networkTechnology} />
              <_Datum label="Network speed" value={product.networkSpeed} />
              <_Datum label="WLAN" value={product.wlan} />
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className={styles.actions}>
          {product.options?.storages && <div className={styles.optionSet}>
            <div className={styles.label}>Storage</div>
            <SegmentedControl
              classNames={{root: styles.storage}}
              value={storage}
              onChange={setStorage}
              data={product.options.storages.map((s, i) => ({
                label: s.name,
                value: i.toString(),
              }))}
            />
          </div>}
          {product.options?.colors && <div className={styles.optionSet}>
            <div className={styles.label}>Color</div>
            <SegmentedControl
              classNames={{root: styles.colors}}
              value={color}
              onChange={setColor}
              data={product.options.colors.map((c, i) => ({
                label: c.name,
                value: i.toString(),
              }))}
            />
          </div>}
          <div className={styles.addContainer}>
            <div className={styles.price}>
              {product.price} €
            </div>
            <Button size='xl' onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  async function handleAddToCart () {
    const storageIndex = parseInt(storage);
    const colorIndex = parseInt(color);

    const storageCode = product.options.storages[storageIndex].code;
    const colorCode = product.options.colors[colorIndex].code;

    const res = await addToCart(id, storageCode, colorCode);

    try {
      const val = parseInt(res.count);
      shopCtx.setCartItems(val);
    }
    catch (err) {
      console.error("Error while reading response from server", err);
    }
  }
}

function _Datum ({
  label,
  value,
}) {
  // If the datum doesn't have any value, we don't render anything.
  if (!value) return <></>;

  if (Array.isArray(value)) {
    value = value.join(", ");
  }

  return (
    <div className={styles.datum}>
      <span className={styles.label}>{label}</span>
      <Text className={styles.value} lineClamp={1}>{value}</Text>
    </div>
  )
}